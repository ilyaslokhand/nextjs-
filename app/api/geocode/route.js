export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("q");

  if (!address) {
    return Response.json({ error: "Missing address" }, { status: 400 });
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent( // encodeURIComponent → spaces, commas sab safe bana deta hai.
      address
    )}&email=ilokhandwala98@gmail.com`,
    {
      headers: {
        "User-Agent": "property-app/1.0",
        "Accept": "application/json",
      },
    }
  );

  const data = await res.json();
  return Response.json(data);
}
