import { json } from "@remix-run/node";

export async function loader() {
  // get data from database
  const settings = {
    name: "My app updated",
    description: "My app description",
  };
  return json(settings);
}

export async function action({ request }) {
  const method = request.method;

  switch (method) {
    case "POST":
      return json({ message: "Success", method: "POST"});

    case "PATCH":
      return json({ message: "Success", method: "PAtCH" });

    default:
      return json({ error: "Method not allowed" }, { status: 405 });
  }
}
