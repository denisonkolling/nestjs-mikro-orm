import { Migration } from '@mikro-orm/migrations';

export class Migration20240802001321 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "collection" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "state" text check ("state" in (\'hidden\', \'published\')) not null default \'hidden\', "priority" int not null default 0);');

    this.addSql('create table "product" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "sku" varchar(255) not null);');

    this.addSql('create table "collection_match_products" ("collection_id" int not null, "product_id" int not null, constraint "collection_match_products_pkey" primary key ("collection_id", "product_id"));');

    this.addSql('create table "collection_fetch_products" ("collection_id" int not null, "product_id" int not null, constraint "collection_fetch_products_pkey" primary key ("collection_id", "product_id"));');

    this.addSql('alter table "collection_match_products" add constraint "collection_match_products_collection_id_foreign" foreign key ("collection_id") references "collection" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "collection_match_products" add constraint "collection_match_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "collection_fetch_products" add constraint "collection_fetch_products_collection_id_foreign" foreign key ("collection_id") references "collection" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "collection_fetch_products" add constraint "collection_fetch_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "collection_match_products" drop constraint "collection_match_products_collection_id_foreign";');

    this.addSql('alter table "collection_fetch_products" drop constraint "collection_fetch_products_collection_id_foreign";');

    this.addSql('alter table "collection_match_products" drop constraint "collection_match_products_product_id_foreign";');

    this.addSql('alter table "collection_fetch_products" drop constraint "collection_fetch_products_product_id_foreign";');

    this.addSql('drop table if exists "collection" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "collection_match_products" cascade;');

    this.addSql('drop table if exists "collection_fetch_products" cascade;');
  }

}
