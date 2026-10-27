import { supabaseAdmin } from "@/lib/supabaseAdmin";
export const instant = false;

type Letter = {
  id: number;
  from: string;
  title: string;
  message: string;
};

export default async function LettersPage() {
  const { data: letters, error } = await supabaseAdmin
    .from("letters")
    .select("id, from, title, message")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error loading letters:", error.message);
  }

  return (
    <main className="min-h-screen bg-[#fff7fb] px-6 py-10 text-[#4a3040] md:px-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <nav className="mb-16 flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-semibold tracking-wide text-[#4a3040]"
          >
            ♡ Saaimah
          </a>

          <span className="text-sm tracking-widest text-pink-400">
            FOR YOUR 21ST
          </span>
        </nav>

        <section className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-pink-400">
            From the people who love you
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Your Letters
            <span className="text-pink-400">♡</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#806575] md:text-lg">
            Words, memories and little reminders from the people who love you.
            Take your time reading them. These are yours.
          </p>

          <div className="mt-6 text-2xl">
            🎀 ✨ 💌 ✨ 🎀
          </div>
        </section>

        {!letters || letters.length === 0 ? (
          <div className="rounded-[2rem] border border-pink-100 bg-white/80 p-12 text-center shadow-[0_15px_50px_rgba(236,72,153,0.08)]">
            <p className="text-4xl">💌</p>

            <h2 className="mt-5 text-2xl font-bold">
              Your letters are coming soon
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-[#806575]">
              Your special messages will appear here once they're added.
            </p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2">
            {letters.map((letter) => (
              <article
                key={letter.id}
                className="group relative rotate-[-1deg] border-[10px] border-white bg-white p-6 pb-10 shadow-[0_15px_45px_rgba(80,30,60,0.16)] transition duration-300 hover:z-10 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(236,72,153,0.22)] even:rotate-[2deg] even:hover:rotate-0"
             >
                {/* Pink scrapbook tape */}
<div className="pointer-events-none absolute -top-5 left-1/2 z-10 h-10 w-24 -translate-x-1/2 rotate-[-5deg] bg-pink-300/70 shadow-sm" />
             <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-2xl">
                    💌
                  </div>

                  <span className="text-sm text-pink-300">
                    {String(letter.id).padStart(2, "0")}
                  </span>
                </div>
<p className="mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#f03f9f]">
  The Love Letters Edition ✦
</p>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
                  {letter.from}
                </p>

                <h2 className="mb-3 text-2xl font-bold">{letter.title}</h2>

                <p className="mb-7 italic leading-7 text-[#806575]">
  A little something written just for you. ♡
</p>

                <a
                  href={`/letter/${letter.id}`}
                  className="inline-block rounded-full bg-[#f472b6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ec4899]"
                >
                  Open letter →
                </a>
              </article>
            ))}
          </section>
        )}

        <section className="py-20 text-center">
          <p className="text-3xl">♡</p>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#806575]">
            Some memories are too special to fit inside a book.
            <br />
            So here are a few more for you to keep.
          </p>
        </section>
      </div>
    </main>
  );
}