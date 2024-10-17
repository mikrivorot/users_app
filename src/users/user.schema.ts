// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

// pseudonyme, unique
// mot de passe, sécurisé.
// name, string, facultatif
// Adresse postale, structure libre, facultative.
// Commentaire, string, facultatif
// Type d’utilisateur: admin(tous les droits) ou utilisateur(droits limités à son
// propre profil).

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  pseudonyme: string;

  @Prop()
  name: string;

  @Prop()
  address: string; // TODO: any structure

  @Prop()
  commentaire: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ["admin", "user"], default: "user" })
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
