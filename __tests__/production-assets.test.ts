import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();

async function fileSize(relativePath: string) {
  const stats = await stat(path.join(projectRoot, relativePath));

  return stats.size;
}

describe("production image assets", () => {
  it.each([
    ["new desktop hero", "fotos/new-hero1.png", "public/images/new-hero1.png"],
    ["new tablet hero", "fotos/new-hero2.png", "public/images/new-hero2.png"],
    ["new mobile hero", "fotos/new-hero3.png", "public/images/new-hero3.png"],
    ["updated bio photo", "fotos/sobre-rafa.JPG", "public/images/sobre-rafa.jpg"],
  ])("%s exists in public images with the original file size", async (_label, source, destination) => {
    const [sourceSize, destinationSize] = await Promise.all([
      fileSize(source),
      fileSize(destination),
    ]);

    expect(destinationSize).toBeGreaterThan(0);
    expect(destinationSize).toBe(sourceSize);
  });

  it("does not create an uppercase bio photo variant in public images", async () => {
    const publicImageEntries = await readdir(path.join(projectRoot, "public/images"));

    expect(publicImageEntries).toContain("sobre-rafa.jpg");
    expect(publicImageEntries).not.toContain("sobre-rafa.JPG");
  });
});
