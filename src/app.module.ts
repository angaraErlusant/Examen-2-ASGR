import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { ClientesModule } from './clientes/clientes.module';
import { FacturasModule } from './facturas/facturas.module';
import { VentasModule } from './ventas/ventas.module';

import { User } from './users/entities/user.entity';
import { Categoria } from './ventas/entities/categoria.entity';
import { Proveedor } from './ventas/entities/proveedor.entity';
import { Producto } from './ventas/entities/producto.entity';
import { Cliente } from './ventas/entities/cliente.entity';
import { Factura } from './ventas/entities/factura.entity';
import { Venta } from './ventas/entities/venta.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Categoria, Proveedor, Producto, Cliente, Factura, Venta],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    CategoriasModule,
    ProveedoresModule,
    ProductosModule,
    ClientesModule,
    FacturasModule,
    VentasModule, //
  ],
})
export class AppModule {}
