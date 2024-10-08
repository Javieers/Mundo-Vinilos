// server.ts

import 'dotenv/config';
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Timestamp } from 'firebase-admin/firestore';

// Verificar que las variables de entorno estén definidas
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error('Faltan variables de entorno necesarias para Firebase');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Asegúrate de reemplazar las nuevas líneas en la clave privada
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Añade esta línea
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Opcional, si usas Realtime Database
  });
}
console.log(`Firebase Admin initialized: ${admin.apps.length} app(s) active`);
console.log('FieldValue:', admin.firestore.FieldValue); // Verificar si FieldValue está disponible
// Exportar instancias del Admin SDK
export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();

export const adminStorage = admin.storage(); // Exporta el almacenamiento
export { admin };

// Configuración de Express
const expressApp = express();
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(cookieParser()); // Para manejar cookies

// Ruta para iniciar sesión actualizada
expressApp.post('/api/auth/signin', async (req, res) => {
  try {
    // Obtener el token de las cabeceras
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(401).json({ message: 'Token no encontrado' });
    }

    // Verificar el ID Token
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    // Crear una cookie de sesión que expire en 5 días
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 días en milisegundos
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // Opciones de la cookie
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Asegúrate de usar HTTPS en producción
      path: '/', // Asegura que la cookie esté disponible en todas las rutas
    };

    // Establecer la cookie en la respuesta
    res.cookie('session', sessionCookie, options);

    // Puedes enviar información adicional si lo deseas
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al manejar la solicitud de inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para cerrar sesión
expressApp.post('/api/auth/signout', async (req, res) => {
  try {
    // Elimina la cookie de sesión
    res.clearCookie('session');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para obtener información del usuario por email
expressApp.get('/api/user', async (req, res) => {
  const sessionCookie = req.cookies.session || '';

  try {
    // Verificar la cookie de sesión
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    // Obtener información del usuario desde Firestore
    const user = await getUserByEmail(decodedClaims.email);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    res.status(401).json({ message: 'No autorizado' });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 4321;
expressApp.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Funciones auxiliares

// Obtener todos los productos disponibles en la colección 'products'
export async function getProducts() {
  try {
    // Obtener los 9 productos más recientes de la colección 'products'
    const productsSnapshot = await adminFirestore.collection('products')
      .orderBy('createdAt', 'desc')
      .limit(9)
      .get();

    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name ?? 'Sin nombre',
      artistName: doc.data().artistName ?? 'Artista desconocido',
      description: doc.data().description ?? 'Sin descripción',
      imageUrl: doc.data().imageUrl ?? '/default-image.png', // Imagen por defecto si no existe
      createdAt: doc.data().createdAt,
    }));

    // Obtener los precios de todos los productos de la subcolección 'sellers/products'
    const sellersProductsSnapshot = await adminFirestore.collectionGroup('products').get();

    const priceMap: { [key: string]: number } = {};

    sellersProductsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const productId = data.productId;
      const price = data.price;

      if (priceMap[productId] != null) {
        priceMap[productId] = Math.min(priceMap[productId], price);
      } else {
        priceMap[productId] = price;
      }
    });

    // Añadir el precio más bajo a cada producto
    const productsWithPrices = products.map(product => ({
      ...product,
      price: priceMap[product.id] !== undefined ? priceMap[product.id] : 'N/A',
    }));

    return productsWithPrices;

  } catch (error) {
    console.error('Error obteniendo productos:', error);
    throw new Error('Error al obtener productos');
  }
}

// Obtener todos los productos sin límite
export async function getAllProducts() {
  try {
    // Obtener todos los productos de la colección 'products'
    const productsSnapshot = await adminFirestore.collection('products')
      .orderBy('createdAt', 'desc')
      .get();

    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name ?? 'Sin nombre',
      artistName: doc.data().artistName ?? 'Artista desconocido',
      description: doc.data().description ?? 'Sin descripción',
      imageUrl: doc.data().imageUrl ?? '/default-image.png',
      createdAt: doc.data().createdAt,
    }));

    // Obtener los precios de todos los productos de la subcolección 'sellers/products'
    const sellersProductsSnapshot = await adminFirestore.collectionGroup('products').get();

    const priceMap: { [key: string]: number } = {};

    sellersProductsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const productId = data.productId;
      const price = data.price;

      if (priceMap[productId] != null) {
        priceMap[productId] = Math.min(priceMap[productId], price);
      } else {
        priceMap[productId] = price;
      }
    });

    // Añadir el precio más bajo a cada producto
    const productsWithPrices = products.map(product => ({
      ...product,
      price: priceMap[product.id] !== undefined ? priceMap[product.id] : 'N/A',
    }));

    return productsWithPrices;

  } catch (error) {
    console.error('Error obteniendo todos los productos:', error);
    throw new Error('Error al obtener todos los productos');
  }
}


// Guardar información del producto para un vendedor en la subcolección 'products'
export async function saveSellerProductInfo(
  sellerId: string,
  productId: string,
  price: number,
  stock: number
) {
  try {
    const productData = {
      productId,
      price,
      stock,
    };

    const productRef = adminFirestore
      .collection('sellers')
      .doc(sellerId)
      .collection('products')
      .doc(productId);
    await productRef.set(productData);

    console.log(`Producto ${productId} guardado para el vendedor ${sellerId}`);
    return { productId, ...productData };
  } catch (error) {
    console.error('Error al guardar la información del producto para el vendedor:', error);
    throw new Error('Error al guardar la información del producto para el vendedor');
  }
}

export async function getSellerProductInfo(productId) {
  try {
    // Obtener todos los vendedores
    const sellersSnapshot = await adminFirestore.collection('sellers').get();

    const sellers = [];

    for (const sellerDoc of sellersSnapshot.docs) {
      const sellerId = sellerDoc.id;
      const sellerData = sellerDoc.data();
      const sellerName = sellerData.name || 'Vendedor Anónimo';

      // Verificar si el vendedor tiene el producto
      const productDoc = await adminFirestore
        .collection('sellers')
        .doc(sellerId)
        .collection('products')
        .doc(productId)
        .get();

      if (productDoc.exists) {
        const productData = productDoc.data();
        sellers.push({
          sellerId,
          sellerName,
          price: productData.price,
          stock: productData.stock,
        });
      }
    }

    return sellers;
  } catch (error) {
    console.error('Error al obtener la información de los vendedores:', error);
    return [];
  }
}

// Obtener información de un vendedor específico junto con los productos que vende
export async function getSellerInfo(sellerId: string) {
  try {
    const sellerRef = adminFirestore.collection('sellers').doc(sellerId);
    const sellerSnapshot = await sellerRef.get();

    if (!sellerSnapshot.exists) {
      throw new Error('Vendedor no encontrado');
    }

    const sellerData = sellerSnapshot.data();

    // Verifica que sellerData no sea undefined
    if (!sellerData) {
      throw new Error('Datos del vendedor no disponibles');
    }

    const productSnapshot = await sellerRef.collection('products').get();

    const products = await Promise.all(
      productSnapshot.docs.map(async (doc) => {
        const productId = doc.id;
        const sellerProductData = doc.data();
        const productDoc = await adminFirestore.collection('products').doc(productId).get();

        if (!productDoc.exists) {
          return {
            productId,
            price: sellerProductData.price,
            stock: sellerProductData.stock,
            name: 'Producto no disponible',
            description: 'Descripción no disponible',
            imageUrl: '/default-image.png',
          };
        }

        return {
          productId,
          price: sellerProductData.price,
          stock: sellerProductData.stock,
          name: productDoc.data()?.name ?? 'Nombre no disponible',
          description: productDoc.data()?.description ?? 'Descripción no disponible',
          imageUrl: productDoc.data()?.imageUrl ?? '/default-image.png',
        };
      })
    );

    return {
      seller: {
        storeName: sellerData.storeName || '',
        sellerName: sellerData.sellerName || '',
        direccion: sellerData.direccion || '',
        email: sellerData.email || '',
        region: sellerData.region || '',
        comuna: sellerData.comuna || '',
        numeroTelefonico: sellerData.numeroTelefonico || '',
        redesSociales: sellerData.redesSociales || '',
        horarioAtencion: sellerData.horarioAtencion || { desde: '', hasta: '' },
        sellerImage: sellerData.sellerImage || '',
        updatedAt: sellerData.updatedAt ? (sellerData.updatedAt as Timestamp).toDate() : null,
        reviews: sellerData.reviews || [],
      },
      products,
    };
  } catch (error) {
    console.error('Error obteniendo la información del vendedor:', error);
    throw new Error('Error al obtener la información del vendedor');
  }
}

// Obtener las órdenes de un usuario por su ID
export async function getUserOrders(userId: string): Promise<any[]> {
  try {
    const ordersSnapshot = await adminFirestore.collection('orders').where('userId', '==', userId).get();

    return ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error obteniendo las órdenes del usuario:', error);
    return [];
  }
}

// Función para obtener información del usuario por email
export async function getUserByEmail(email: string): Promise<any | null> {
  try {
    const usersCollection = adminFirestore.collection('users');
    const userSnapshot = await usersCollection.where('email', '==', email).get();

    if (userSnapshot.empty) {
      return null;
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    return {
      id: userDoc.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
  } catch (error) {
    console.error('Error al obtener el usuario por email:', error);
    return null;
  }
}

// Exportar las instancias y funciones necesarias
export { expressApp };
