// src/pages/api/seller/updateProfile.ts

import type { APIRoute } from 'astro';
import { adminAuth, adminFirestore } from '../../../firebase/server';
import { FieldValue } from 'firebase-admin/firestore'; // Importamos FieldValue

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (!decodedClaims.seller) {
      return new Response(JSON.stringify({ message: 'Acceso denegado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sellerId = decodedClaims.uid;
    const {
      storeName,
      direccion,
      region,
      comuna,
      numeroTelefonico,
      redesSociales,
      horarioAtencion,
      sellerImage,
    } = await request.json();

    console.log('Datos recibidos para la actualización:', {
      storeName,
      direccion,
      region,
      comuna,
      numeroTelefonico,
      redesSociales,
      horarioAtencion,
      sellerImage,
    });

    // Validar campos obligatorios y registrar cuáles faltan
    const missingFields: string[] = [];

    if (!storeName) missingFields.push('storeName');
    if (!direccion) missingFields.push('direccion');
    if (!region) missingFields.push('region');
    if (region === 'Región Metropolitana' && !comuna) missingFields.push('comuna');
    if (!horarioAtencion) {
      missingFields.push('horarioAtencion');
    } else {
      if (!horarioAtencion.desde) missingFields.push('horarioAtencion.desde');
      if (!horarioAtencion.hasta) missingFields.push('horarioAtencion.hasta');
    }
    if (!sellerImage) missingFields.push('sellerImage');

    if (missingFields.length > 0) {
      console.warn('Faltan campos obligatorios:', missingFields);
      return new Response(JSON.stringify({ message: 'Faltan campos obligatorios', missingFields }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Preparar los datos a actualizar
    const updateData: any = {
      storeName: storeName,
      direccion: direccion,
      region: region,
      horarioAtencion: {
        desde: horarioAtencion.desde,
        hasta: horarioAtencion.hasta,
      },
      sellerImage: sellerImage,
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (region === 'Región Metropolitana') {
      updateData.comuna = comuna;
    }

    if (numeroTelefonico) {
      updateData.numeroTelefonico = numeroTelefonico;
    }

    if (redesSociales) {
      updateData.redesSociales = redesSociales;
    }

    // Actualizar el documento del vendedor
    await adminFirestore.collection('sellers').doc(sellerId).update(updateData);

    console.log('Perfil actualizado correctamente para el vendedor:', sellerId);

    return new Response(JSON.stringify({ message: 'Perfil actualizado correctamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al actualizar el perfil del vendedor:', error);
    return new Response(JSON.stringify({ message: 'Error al actualizar el perfil' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
