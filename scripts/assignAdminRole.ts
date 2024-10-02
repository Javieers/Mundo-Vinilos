// assignAdminRole.ts

require('dotenv/config');
const admin = require('firebase-admin');

// Verificar que las variables de entorno estén definidas
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;

if (!firebaseProjectId || !firebasePrivateKey || !firebaseClientEmail) {
  throw new Error('Faltan variables de entorno necesarias para Firebase');
}

// Inicializar Firebase Admin SDK si no está inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseProjectId,
      privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      clientEmail: firebaseClientEmail,
    }),
  });
}

const adminAuth = admin.auth();

async function setAdminClaim(email) {
  try {
    const user = await adminAuth.getUserByEmail(email);
    await adminAuth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`Rol de administrador asignado correctamente al usuario ${email}.`);
  } catch (error) {
    console.error('Error al asignar el rol de administrador:', error);
  }
}

// Reemplaza 'tu_email@example.com' por tu correo electrónico
setAdminClaim('javierflores55946@gmail.com');
