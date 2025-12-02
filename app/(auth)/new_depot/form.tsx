"use client";

import { createDepotAction } from "../actions";

function Inner() {
  async function onClick() {
    const error = await createDepotAction();
  }
  return <Button onClick={() => onClick()}>Eröffnen</Button>;
}

// a
