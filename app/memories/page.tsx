
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const instant = false;

export default async function MemoriesPage() {
  const { data: files, error } = await supabaseAdmin.storage
    .from("memories")
    .list("", { limit: 1000 });

  if (error) {
    console.error("Memories error:", error.message);
  }

  const photos = await Promise.all(
    (files ?? [])
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name))
      .map(async (file) => {
        const { data } = await supabaseAdmin.storage
          .from("memories")
          .createSignedUrl(file.name, 60 * 60);

        return {
          name: file.name,
          url: data?.signedUrl ?? "",
        };
      })
  );

  const rotations = [
    "rotate-[-1deg]",
    "rotate-[1deg]",
    "rotate-[-1deg]",
    "rotate-[1deg]",
    "rotate-0",
    "rotate-[-1deg]",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff0f7] px-4 py-10 text-[#4a3040] md:px-12">
      <nav className="mx-auto mb-16 flex max-w-6xl items-center justify-between">
        <a href="/" className="text-sm font-bold tracking-widest">
          SAAIMAH ♡
        </a>
        <a
          href="/letters"
          className="rounded-full border border-pink-300 px-5 py-2 text-sm font-semibold text-pink-600"
        >
          Love Letters 💌
        </a>
      </nav>

      <header className="mx-auto mb-12 max-w-4xl text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-pink-500">
          The Birthday Issue · No. 21
        </p>

        <h1 className="font-serif text-5xl font-bold italic text-[#d63384] md:text-8xl">
          The Memory Wall
        </h1>

        <p className="mt-6 text-lg italic text-[#806575]">
          A little bit of everything, and a whole lot of us. ♡
        </p>

        <div className="mt-8 text-4xl">
          🎀 ✦ 💗 ✦ 🎀
        </div>
      </header>

      {photos.length === 0 ? (
        <p className="text-center text-pink-500">
          Our memories are coming soon! ♡
        </p>
      ) : (
        <section className="relative mx-auto max-w-6xl py-10">
          <div className="pointer-events-none absolute left-0 top-0 text-5xl opacity-70 md:text-8xl">
            ✿
          </div>

          <div className="pointer-events-none absolute right-0 top-10 rotate-12 text-5xl md:text-7xl">
            💋
          </div>

          <div className="grid grid-cols-2 gap-3 px-2 sm:gap-5 md:grid-cols-3 md:gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.name}
                className={`group relative min-w-0 ${rotations[index % rotations.length]} transition-transform duration-300 hover:z-30 hover:scale-105 hover:rotate-0`}
              >
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden border-[5px] border-white bg-white shadow-[0_8px_22px_rgba(112,38,79,0.22)] md:border-[9px]"
                >
                  <img
                    src={photo.url}
                    alt={`Memory ${index + 1}`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                {index % 6 === 0 && (
                  <span className="pointer-events-none absolute -bottom-4 -right-3 z-30 rotate-12 text-3xl drop-shadow-sm md:text-5xl">
                    💗
                  </span>
                )}

                {index % 7 === 2 && (
                  <span className="pointer-events-none absolute -top-5 left-1/2 z-30 -translate-x-1/2 rotate-[-15deg] bg-pink-300/80 px-6 py-2 shadow-sm">
                    <span className="text-xs font-black tracking-widest text-pink-800">
                      XOXO
                    </span>
                  </span>
                )}

                {index % 9 === 4 && (
                  <span className="pointer-events-none absolute -left-5 top-1/2 z-30 text-3xl md:text-5xl">
                    ✨
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="pointer-events-none mt-12 flex items-center justify-center gap-4 text-3xl md:text-5xl">
            💌
            <span className="font-serif text-xl italic text-pink-500 md:text-2xl">
              so many memories, so much love
            </span>
            🎀
          </div>
        </section>
      )}

      <footer className="mx-auto mt-20 max-w-4xl border-t border-pink-200 py-10 text-center">
        <p className="font-serif text-xl italic text-pink-500">
          Here's to all the memories we've made,
          and all the ones still waiting for us. ♡
        </p>
      </footer>
    </main>
  );
}
