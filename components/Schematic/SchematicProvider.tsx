"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  SchematicProvider,
  useSchematicEvents,
} from "@schematichq/schematic-react";

const publishableKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY is not set");
}

const SchematicWrapped = ({ children }: { children: React.ReactNode }) => {
  const { identify } = useSchematicEvents();
  const { user } = useUser();

  useEffect(() => {
    const userName =
      user?.username ??
      user?.fullName ??
      user?.emailAddresses[0]?.emailAddress ??
      user?.id;

    if (user?.id) {
      identify({
        // Company level keys
        company: {
          keys: {
            id: user.id,
          },
        },
        // User level keys
        keys: {
          id: user.id,
        },
        name: userName,
      });
    }
  }, [identify, user]);

  return children;
};

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SchematicProvider publishableKey={publishableKey}>
      <SchematicWrapped>{children}</SchematicWrapped>
    </SchematicProvider>
  );
}

export default Provider;
