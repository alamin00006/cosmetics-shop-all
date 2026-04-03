import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global prefix
  app.setGlobalPrefix("api");

  // CORS
  app.enableCors({
    origin: configService.get("FRONTEND_URL") || "http://localhost:5173",
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("E-Commerce API")
    .setDescription(
      "Full-featured e-commerce backend API with authentication, products, cart, orders, wishlist, and admin management.",
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .addTag("Health", "Health check endpoint")
    .addTag("Auth", "Authentication endpoints")
    .addTag("Users", "User profile management")
    .addTag("Products", "Product catalog")
    .addTag("Categories", "Product categories")
    .addTag("Cart", "Shopping cart operations")
    .addTag("Orders", "Order management")
    .addTag("Wishlist", "Wishlist operations")
    .addTag("Addresses", "Address management")
    .addTag("Admin", "Admin dashboard and management")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "E-Commerce API Documentation",
  });

  const port = configService.get("PORT") || 3001;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 API available at http://localhost:${port}/api`);
  console.log(`📖 Swagger docs at http://localhost:${port}/api/docs`);
}

bootstrap();
