import { NextResponse } from "next/server";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Converte o formato de documento do Firestore REST API para objeto simples
function parseFirestoreDoc(doc: Record<string, unknown>) {
  const id = (doc.name as string).split("/").pop()!;
  const fields = doc.fields as Record<string, Record<string, unknown>>;
  return {
    id,
    name: fields?.name?.stringValue ?? "",
    price: fields?.price?.stringValue ?? fields?.price?.doubleValue ?? fields?.price?.integerValue ?? "",
    category: fields?.category?.stringValue ?? "",
    imageUrl: fields?.imageUrl?.stringValue ?? "",
  };
}

// **GET** - Busca produtos via Firestore REST API (sem SDK, sem WebSocket, sem 50MB)
export async function GET() {
  try {
    const url = `${FIRESTORE_URL}/products?pageSize=8&mask.fieldPaths=name&mask.fieldPaths=price&mask.fieldPaths=category&mask.fieldPaths=imageUrl`;

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      // Cache nativo do Next.js: revalida a cada 5 minutos
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Firestore REST error: ${response.status}`);
    }

    const data = await response.json();
    const documents = data.documents ?? [];
    const produtos = documents.map(parseFirestoreDoc);

    return NextResponse.json(produtos, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}


