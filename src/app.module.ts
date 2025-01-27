import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { ProductsModule } from "./products/products.module"
import { OrdersModule } from "./orders/orders.module"
import { MollieService } from "./payments/mollie.service"
import { SEOService } from "./seo/seo.service"
import { TemplatesModule } from "./templates/templates.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "username",
      password: "password",
      database: "sellenix",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    TemplatesModule,
  ],
  providers: [MollieService, SEOService],
})
export class AppModule {}

