import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { OrmModule } from './orm/orm.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                metadataProvider: TsMorphMetadataProvider,
                driver: PostgreSqlDriver,
                forceUtcTimezone: true,
                forceUndefined: true,
                dataloader: true,
                host: configService.getOrThrow<string>('DB_HOSTNAME'),
                port: configService.get<number>('DB_PORT', 5432),
                user: configService.getOrThrow<string>('DB_USERNAME'),
                password: configService.getOrThrow<string>('DB_PASSWORD'),
                dbName: configService.getOrThrow<string>('DB_NAME'),
                autoLoadEntities: true,
            }),
        }),
        OrmModule,
        ProductsModule,
    ],
})
export class AppModule {}
