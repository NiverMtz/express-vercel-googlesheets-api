const { GoogleGenerativeAI } = require("@google/generative-ai");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generarPDF(data) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const prompt = `Genera una idea para un videojuego con los siguientes parámetros:
  - Plataforma: ${data.platform}
  - Género: ${data.gender}
  - Arte: ${data.art}
  - Engine: ${data.engine}
  - Descripcion: ${data.description}

  La extensión máxima deben ser 150 palabras, pero cada renglón deber tener 50 palabras o menos.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().toString();

  // Crear un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Tamaño A4 en puntos (595 x 842 pt)

  // Obtener la fuente estándar Helvetica
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Configuración de estilos
  const titleSize = 24;
  const headerSize = 18;
  const subheaderSize = 14;
  const bodySize = 12;
  const margin = 50;
  let yPosition = 800; // Comenzar cerca de la parte superior

  // Función para agregar texto con estilo
  const addText = (text, x, y, size, isBold = false, color = rgb(0, 0, 0)) => {
    const currentFont = isBold ? fontBold : font;
    page.drawText(text, {
      x,
      y,
      size,
      font: currentFont,
      color,
    });
    return y - size - 5; // Devuelve la nueva posición Y
  };

  // Título del documento
  yPosition = addText("UTEL Gaming", margin, yPosition, titleSize, true);

  // Subtítulo
  // yPosition = addText("UTEL Gaming", margin, yPosition - 20, bodySize);

  // Sección: Plataforma
  yPosition = addText("Plataforma", margin, yPosition - 30, headerSize, true);
  yPosition = addText(data.platform, margin, yPosition - 10, bodySize);

  // Sección: Género
  yPosition = addText("Género", margin, yPosition - 20, headerSize, true);
  yPosition = addText(data.gender, margin, yPosition - 10, bodySize);

  // Sección: Resumen de Género/Historia/Mecánicas
  yPosition = addText("Art", margin, yPosition - 20, headerSize, true);
  yPosition = addText(data.art, margin, yPosition - 10, bodySize);

  // Sección: Características
  yPosition = addText("Engine", margin, yPosition - 20, headerSize, true);
  yPosition = addText(data.engine, margin, yPosition - 10, bodySize);

  // Sección: Texto Generado
  yPosition = addText(
    "Plan de acción",
    margin,
    yPosition - 20,
    headerSize,
    true
  );
  yPosition = addText(text, margin, yPosition - 10, bodySize);

  // Sección: Estilo de Arte
  // yPosition = addText(
  //   "Estilo de Arte:",
  //   margin,
  //   yPosition - 20,
  //   headerSize,
  //   true
  // );
  // yPosition = addText(
  //   "Añade todas las imágenes y juegos con estética similar a lo que estás intentando conseguir.",
  //   margin + 20,
  //   yPosition - 10,
  //   bodySize
  // );

  // Sección: Música/Sonido
  // yPosition = addText(
  //   "Música/Sonido:",
  //   margin,
  //   yPosition - 20,
  //   headerSize,
  //   true
  // );
  // yPosition = addText(
  //   "Incluye enlaces a la música y sonidos similares a lo que buscas. Puedes enunciar las",
  //   margin + 20,
  //   yPosition - 10,
  //   bodySize
  // );
  // yPosition = addText(
  //   "emociones que deben evocar al jugador con todo el apartado sonoro.",
  //   margin + 20,
  //   yPosition - 5,
  //   bodySize
  // );

  // Sección: Hoja de ruta del desarrollo / Lanzamiento
  // yPosition = addText(
  //   "Hoja de ruta del desarrollo / Lanzamiento:",
  //   margin,
  //   yPosition - 20,
  //   headerSize,
  //   true
  // );

  // Subsección: Plataformas y Audiencia
  // yPosition = addText(
  //   "Plataformas: Steam/Google Play/iOS/Web.",
  //   margin + 20,
  //   yPosition - 15,
  //   subheaderSize
  // );
  // yPosition = addText(
  //   "Audiencia: Edad/género/intereses.",
  //   margin + 20,
  //   yPosition - 10,
  //   subheaderSize
  // );

  // Subsección: Hitos
  // yPosition = addText(
  //   "Hito 1: Mecánicas completas - 0/0/00",
  //   margin + 20,
  //   yPosition - 20,
  //   bodySize
  // );
  // yPosition = addText(
  //   "Hito 4: Pulido completo - 0/0/00",
  //   margin + 300,
  //   yPosition + 15,
  //   bodySize
  // );

  // yPosition = addText(
  //   "Hito 2: Lucha con boss completo - 0/0/00",
  //   margin + 20,
  //   yPosition - 10,
  //   bodySize
  // );
  // yPosition = addText("---", margin + 300, yPosition + 5, bodySize);

  // yPosition = addText(
  //   "Hito 3: Niveles completos - 0/0/00",
  //   margin + 20,
  //   yPosition - 10,
  //   bodySize
  // );
  // yPosition = addText(
  //   "Día de Lanzamiento: 0/0/00",
  //   margin + 300,
  //   yPosition + 5,
  //   bodySize
  // );

  // Pie de página
  // yPosition = addText(
  //   "Special thanks to Josehzz. Made with love by http://gdu.io",
  //   margin,
  //   yPosition - 30,
  //   bodySize
  // );
  // yPosition = addText(
  //   "© 2017 Game Dev Underground. Free to use/modify/distribute under CC 4.0.",
  //   margin,
  //   yPosition - 5,
  //   bodySize
  // );
  // yPosition = addText(
  //   "Traducción al español a cargo de Alberto Blanco, de Cosmic Works.",
  //   margin,
  //   yPosition - 5,
  //   bodySize
  // );

  return await pdfDoc.saveAsBase64();
}

module.exports = { generarPDF };
