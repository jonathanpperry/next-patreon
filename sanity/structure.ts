import { MailCheck, MailOpen, MailPlus } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== "message"
      ),

      // Custom structure for VIP messages
      S.listItem()
        .title("VIP Messages")
        .icon(MailPlus)
        .child(
          S.list()
            .title("VIP Messages")
            .items([
              S.listItem()
                .title("New Messages")
                .icon(MailCheck)
                .child(
                  S.documentList()
                    .title("Unread Messages")
                    .filter('_type == "message" && isRead != true')
                    .defaultOrdering([
                      { field: "_createdAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Read Messages")
                .icon(MailOpen)
                .child(
                  S.documentList()
                    .title("Read Messages")
                    .filter('_type == "message" && isRead == true')
                ),
            ])
        ),
    ]);
