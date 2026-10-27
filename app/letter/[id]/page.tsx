import { Suspense } from "react";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function LoadingLetter() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7fb] px-6 text-[#4a3040]">
      <div className="text-center">
        <div className="mb-4 text-5xl">💌</div>
        <p className="text-lg text-[#806575]">Opening your letter...</p>
      </div>
    </main>
  );
}

async function LetterPageContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: letter, error } = await supabaseAdmin
    .from("letters")
    .select("id, from, title, message, image_url")
    .eq("id", id)
    .single();

  if (error || !letter) {
    notFound();
  }

  let imageUrl: string | null = null;

  if (letter.image_url) {
    const { data, error: imageError } = await supabaseAdmin.storage
      .from("letters")
      .createSignedUrl(letter.image_url, 60 * 60);

    if (imageError) {
      console.error("IMAGE ERROR:", imageError.message);
      console.error("IMAGE PATH:", letter.image_url);
    }

    imageUrl = data?.signedUrl ?? null;
  }

  return (
    <main className="min-h-screen bg-[#fff7fb] px-6 py-10 text-[#4a3040] md:px-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <nav className="mb-12">
          <a
            href="/letters"
            className="text-sm font-semibold text-pink-400 transition hover:text-pink-500"
          >
            ← Back to your letters
          </a>
        </nav>

        <article className="rounded-[2.5rem] border border-pink-100 bg-white/90 p-8 shadow-[0_20px_70px_rgba(236,72,153,0.12)] md:p-14">
          <div className="mb-10 text-center">
            {/* Decorative scrapbook ribbon */}
<div className="mb-8 flex items-center justify-center gap-3">
  <span className="h-px w-12 bg-pink-200" />
  <span className="text-3xl">🎀</span>
  <span className="h-px w-12 bg-pink-200" />
</div>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-4xl">
              💌
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-pink-400">
              A letter from
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              {letter.from}
            </h1>

            <p className="mt-4 text-lg italic text-[#806575]">
              {letter.title}
            </p>
          </div>

          {imageUrl && (
            <div className="mx-auto mb-10 max-w-2xl overflow-hidden rounded-2xl border border-pink-100 bg-pink-50 p-3">
              <img
                src={imageUrl}
                alt={`Letter from ${letter.from}`}
                className="h-auto w-full rounded-xl"
              />
            </div>
          )}

          {letter.message && (
            <div className="mx-auto max-w-2xl border-t border-pink-100 pt-10">
              <p className="whitespace-pre-line font-serif text-xl italic leading-10 text-[#5f4655]">
                {letter.message}
              </p>
            </div>
          )}

          <div className="mt-12 text-center text-2xl">♡ 🎀 ♡</div>
        </article>
      </div>
    </main>
  );
}

export default function LetterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<LoadingLetter />}>
      <LetterPageContent params={params} />
    </Suspense>
  );
}