import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function GetResultCheckMatchDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'Check character match percentage',
      description:
        'API ini menghitung persentase karakter dari `input1` yang muncul di `input2`.\n\n' +
        '**Contoh Perhitungan:**\n' +
        '- input1 = `"ABBCD"`, input2 = `"Gallant Duck"`\n' +
        '- Karakter yang cocok = `A`, `C`, `D`\n' +
        '- Total karakter unik input1 = 5\n' +
        '- Hasil = 3/5 × 100 = **60%**\n\n' +
        '**Aturan Perhitungan:**\n' +
        '- Case-insensitive (huruf besar/kecil dianggap sama, misal `a` = `A`).\n' +
        '- Angka dan simbol juga ikut dihitung.\n',
    }),
    ApiOkResponse({ description: 'Success get result' }),
  );
}
