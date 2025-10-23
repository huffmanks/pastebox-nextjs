export async function GET(request: Request) {
  try {
    const id = c.req.param("id");
    const file = await db.query.files.findFirst({ where: eq(files.id, id) });
    if (!file) return c.json({ error: "Not found" }, 404);

    const drop = await db.query.drops.findFirst({ where: eq(drops.id, file.dropId) });
    if (!drop) return c.json({ error: "Drop missing" }, 404);
    if (new Date() > new Date(drop.expiresAt)) return c.json({ error: "Expired" }, 410);

    const filePath = file.filePath;
    if (!fs.existsSync(filePath)) return c.json({ error: "File missing" }, 404);

    return c.body(fs.readFileSync(filePath), 200, {
      "Content-Type": file.mimeType,
      "Content-Disposition": `attachment; filename="${file.fileName}"`,
    });
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
