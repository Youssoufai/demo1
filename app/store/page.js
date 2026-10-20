import Store from "@/components/Store";

export const metadata = {
  title: "The Store",
  description:
    "The JUKAYPERFUMES store lists every extrait, including what is in stock and what has sold out. Add a bottle to your bag, or remove it.",
};

export default function StorePage() {
  return (
    <main id="content">
      <Store />
    </main>
  );
}
