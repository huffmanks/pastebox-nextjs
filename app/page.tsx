import Form from "@/components/form";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Form />
      </main>
    </>
  );
}
