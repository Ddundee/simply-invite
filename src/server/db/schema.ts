// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
    boolean,
    index,
    integer,
    pgTableCreator,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `simply-invite_${name}`);

export const event = createTable("event", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    // userId: varchar("userId", { length: 256 }),
    // name: varchar("name", { length: 512 }),
    // date: timestamp("date"),
    // hostName: varchar("host_name", { length: 512 }),
    // location: varchar("location", { length: 512 }),
    // note: varchar("note", { length: 2048 }),
    // publicGuestList: boolean("public_guest_list"),
});

// export const guest = createTable("guest", {
//     id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
//     eventId: integer("event_id"),
//     name: varchar("name", { length: 512 }),
//     numGuests: integer("num_guests"),
//     response: varchar("response", {
//         enum: ["accepted", "declined", "pending"],
//     })
// });
