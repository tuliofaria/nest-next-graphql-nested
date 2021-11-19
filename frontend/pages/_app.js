import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:3000/graphql",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
