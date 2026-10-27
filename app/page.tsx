export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fff8fc] text-[#2f2029]">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/3 h-[25rem] w-[25rem] rounded-full bg-pink-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-6 md:px-10 md:py-8">

        {/* Top navigation */}
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-bold tracking-tight"
          >
            ♡ SAAIMAH
          </a>

          <div className="hidden text-[10px] font-semibold uppercase tracking-[0.35em] text-[#806575] md:block">
            Birthday Edition · 2026
          </div>

         
<div className="flex items-center gap-2">
  <a
    href="/letters"
    className="rounded-full border border-[#2f2029] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition hover:bg-[#2f2029] hover:text-white md:px-5 md:text-xs"
  >
    Your Letters
  </a>

  <a
    href="/memories"
    className="rounded-full bg-[#f472b6] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white transition hover:bg-[#ec4899] md:px-5 md:text-xs"
  >
    Our Memories ♡
  </a>
</div>
</nav>


        {/* Main cover */}
        <section className="relative mt-10 grid items-center gap-10 md:mt-16 md:grid-cols-[1.1fr_0.9fr]">

          {/* Left side */}
          <div className="relative z-10">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.45em] text-pink-500">
              The Birthday Issue
            </p>

            <h1 className="text-[clamp(4.5rem,13vw,10rem)] font-black leading-[0.75] tracking-[-0.07em]">
              SAAIMAH
            </h1>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-14 bg-[#2f2029]" />

              <p className="text-sm font-medium uppercase tracking-[0.25em]">
                Issue No. 21
              </p>
            </div>

            <p className="mt-8 max-w-lg text-base leading-7 text-[#806575] md:text-lg">
              A little collection of words, memories and love from the people
              who know just how special you are.
            </p>

            <a
              href="/letters"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f03f9f] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[0_15px_35px_rgba(240,63,159,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-[#d92f8b]"
            >
              Open your letters
              <span>→</span>
            </a>

            <div className="mt-10 flex items-center gap-5 text-2xl">
              <span>♡</span>
              <span className="text-base">🎀</span>
              <span>✦</span>
              <span className="text-base">💋</span>
            </div>
          </div>

          {/* Right editorial collage */}
          <div className="relative mx-auto h-[500px] w-full max-w-md md:h-[600px]">

            
           {/* Main editorial photo */}
<div className="absolute left-[8%] top-[4%] h-[410px] w-[72%] rotate-[-5deg] overflow-hidden border-[10px] border-white bg-pink-100 shadow-[0_25px_60px_rgba(80,30,60,0.18)] md:h-[500px]">
  <img
    src="/saaimah.jpg"
    alt="Saaimah's 21st birthday magazine cover"
    className="h-full w-full object-cover object-center"
  />
</div>

            {/* Magazine label */}
<div className="absolute right-[3%] top-[12%] rotate-[8deg] bg-[#2f2029] px-5 py-3 text-center text-white shadow-lg">
  <p className="text-[9px] uppercase tracking-[0.3em]">
    Beautiful
  </p>
  <p className="text-sm font-bold">Brilliant</p>
  <p className="text-sm font-bold">Beloved</p>
</div>

            {/* Pink sticker */}
            <div className="absolute bottom-[16%] right-[4%] flex h-28 w-28 rotate-[10deg] items-center justify-center rounded-full bg-[#f03f9f] text-center text-white shadow-[0_15px_35px_rgba(240,63,159,0.25)]">
              <p className="text-xs font-black uppercase leading-4 tracking-widest">
                Birthday
                <br />
                Girl
                <br />
                ♡
              </p>
            </div>

            {/* Small photo card */}
            <div className="absolute bottom-[3%] left-[0%] w-36 rotate-[7deg] border-8 border-white bg-white p-2 shadow-[0_15px_35px_rgba(80,30,60,0.15)]">
              <div className="flex aspect-square items-center justify-center bg-pink-50 text-3xl">
                ✨
              </div>
              <p className="pt-2 text-center text-[9px] font-bold uppercase tracking-widest">
                The 21st
              </p>
            </div>

            {/* Sparkles */}
            <div className="absolute left-[2%] top-[18%] text-3xl text-pink-400">
              ✦
            </div>

            <div className="absolute right-[12%] bottom-[38%] text-2xl">
              ♡
            </div>

            <div className="absolute left-[22%] bottom-[17%] text-xl text-pink-400">
              ✧
            </div>
          </div>
        </section>

        {/* Bottom editorial strip */}
        <section className="mt-8 border-y border-[#e9d9e2] py-5 md:mt-16">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#806575]">
            <span>21st Birthday</span>
            <span>♡</span>
            <span>Memories</span>
            <span>♡</span>
            <span>Friendship</span>
            <span>♡</span>
            <span>Love</span>
          </div>
        </section>

        {/* Quote */}
        <section className="py-16 text-center md:py-24">
          <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-relaxed md:text-4xl">
            “Some people make life prettier simply by being in it.”
          </p>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.35em] text-pink-500">
            Made with love for Saaimah
          </p>
        </section>

      </div>
    </main>
  );
}