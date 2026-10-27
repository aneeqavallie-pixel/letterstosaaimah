
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
      .filter((file) =>
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
      )
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
    "rotate-[-4deg]",
    "rotate-[3deg]",
    "rotate-[-2deg]",
    "rotate-[5deg]",
    "rotate-[-3deg]",
    "rotate-[2deg]",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff0f7] px-5 py-10 text-[#4a3040] md:px-12">
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

      <header className="mx-auto mb-16 max-w-4xl text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-pink-500">
          The Birthday Issue · No. 21
        </p>

        <h1 className="font-serif text-5xl font-bold italic text-[#d63384] md:text-8xl">
          The Memory Wall
        </h1>

        <p className="mt-6 text-lg italic text-[#806575]">
          A collection of little moments that mean everything. ♡
        </p>

        <div className="mt-8 text-4xl">🎀 ✦ 💗 ✦ 🎀</div>
      </header>

      {photos.length === 0 ? (
        <p className="text-center text-pink-500">
          Our memories are coming soon! ♡
        </p>
      ) : (
        <section className="mx-auto grid max-w-6xl grid-cols-2 gap-x-3 gap-y-12 py-10 md:grid-cols-3 md:gap-x-10 md:gap-y-20">
          {photos.map((photo, index) => (
            <div
              key={photo.name}
              className={`relative ${rotations[index % rotations.length]} transition duration-300 hover:z-10 hover:rotate-0 hover:scale-110`}
            >
              <div className="absolute -top-3 left-1/2 z-10 h-7 w-16 -translate-x-1/2 rotate-[-8deg] bg-pink-300/70 shadow-sm md:w-24" />

              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-2 pb-8 shadow-[0_12px_35px_rgba(112,38,79,0.18)] md:p-4 md:pb-14"
              >
                <div className="aspect-[4/5] overflow-hidden bg-pink-100">
                  <img
                    src={photo.url}
                    alt={`Memory ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <p className="mt-3 text-center font-serif text-xs italic text-pink-500 md:text-base">
                  Forever a favourite ♡
                </p>
              </a>

              {index % 5 === 0 && (
                <span className="absolute -bottom-6 -right-3 text-3xl md:text-5xl">
                  💗
                </span>
              )}

              {index % 7 === 0 && (
                <span className="absolute -left-3 top-1/2 text-2xl md:text-4xl">
                  ✨
                </span>
              )}
            </div>
          ))}
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
