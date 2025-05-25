"use client";

import { SchematicEmbed } from "@schematichq/schematic-components";

function SchematicEmbedComponent({
  accessToken,
  componentId,
}: {
  accessToken: string;
  componentId: string;
}) {
  return <SchematicEmbed accessToken={accessToken} id={componentId} />;
}

export default SchematicEmbedComponent;
