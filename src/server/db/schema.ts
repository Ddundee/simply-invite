// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
    boolean,
    integer,
    pgTableCreator,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `simply-invite_${name}`);

export const event = createTable("event", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: varchar("userId", { length: 256 }).notNull(),
    name: varchar("name", { length: 512 }).notNull(),
    date: timestamp("date").notNull(),
    hostName: varchar("host_name", { length: 512 }).notNull(),
    location: varchar("location", { length: 512 }).notNull(),
    note: varchar("note", { length: 2048 }),
    publicGuestList: boolean("public_guest_list").notNull(),
});

export const guest = createTable("guest", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    eventId: integer("event_id").notNull(),
    name: varchar("name", { length: 512 }).notNull(),
    numGuests: integer("num_guests").notNull(),
    response: varchar("response", {
        enum: ["accepted", "declined", "pending"],
    }).notNull(),
});
