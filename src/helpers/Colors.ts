export class Colors {
  static generateHexCode() {
    // Gerar valores de cor RGB aleatórios
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // Converter os valores RGB em formato hexadecimal
    let hexR = r.toString(16).padStart(2, '0');
    let hexG = g.toString(16).padStart(2, '0');
    let hexB = b.toString(16).padStart(2, '0');

    // Concatenar os valores hexadecimais para formar a cor final
    let colorHexadecimal = '#' + hexR + hexG + hexB;

    return colorHexadecimal;
  }

  static checkContrast(background: string) {
    // Extrair valores de cor RGB da cor de fundo
    let r = parseInt(background.slice(1, 3), 16);
    let g = parseInt(background.slice(3, 5), 16);
    let b = parseInt(background.slice(5, 7), 16);

    // Calcular valor médio das cores RGB
    let averageValue = (r + g + b) / 3;

    // Definir valor de limiar
    let threshold = 128;

    // Verificar se o valor médio é maior ou menor do que o valor de limiar
    if (averageValue > threshold) {
      return true;
    }
    return false;
  }

  static generateLightColor() {
    // Define valores de matiz e saturação
    var hue = Math.floor(Math.random() * 360);
    var saturation = Math.floor(Math.random() * 100);

    // Define valor mínimo de luminosidade
    var minimumLightness = 75;

    // Gera um valor aleatório de luminosidade a partir do mínimo
    var lightness =
      Math.floor(Math.random() * (100 - minimumLightness + 1)) +
      minimumLightness;

    // Converte valores HSL para hexadecimal
    var color = Colors.hslToHex(hue, saturation, lightness);

    return color;
  }

  // Função para converter valores HSL para hexadecimal
  static hslToHex(h: number, s: number, l: number) {
    h /= 360;
    s /= 100;
    l /= 100;
    var r, g, b;
    if (s === 0) {
      r = g = b = l; // A cor é acinzentada (sem saturação)
    } else {
      var hue2rgb = function hue2rgb(p: number, q: number, t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    var toHex = function (x: number) {
      var hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }
}
