import { Env } from '@/config/env';
import { SwaggerConfig } from './swagger.interface';

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Hashmicro App Test API Documentation',
  description: `
    Dokumentasi API untuk Hashmicro App Test.  
    Berisi endpoint CRUD (User, Role, Tag, Article) serta fitur tambahan seperti Analyzer.

    ⚙️ **Informasi Umum:**
    - Autentikasi menggunakan **JWT Bearer Token**.
    - Role-based access control: beberapa endpoint hanya bisa diakses oleh **admin**.
    - Versi API saat ini: **v1**.
    - Semua response standar menggunakan format JSON.
    
    📌 **Fitur Utama:**
    - Auth → login & cek profil user
    - User → CRUDuser (admin only)
    - Tag → CRUD tag (admin untuk create/update/delete, publik untuk list)
    - Article → CRUD artikel (admin untuk create/update/delete, publik untuk list)
    - Analyzer → hitung persentase kemiripan karakter antar string

  `,
  version: '1.0',
  servers: [
    { url: Env.domain.backend + ':' + Env.app.port, description: 'Backend' },
  ],
};
