export async function POST(request: Request) {
  try {
    const id = c.req.param("id");
    const drop = await db.query.drops.findFirst({
      where: eq(drops.id, id),
      with: { files: true },
    });

    if (!drop) return c.json({ error: "Not found" }, 404);

    await db
      .update(drops)
      .set({ views: drop.views + 1 })
      .where(eq(drops.id, id));

    if (new Date() > new Date(drop.expiresAt)) return c.json({ error: "Expired" }, 410);

    return c.json(drop);
  } catch (error) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
