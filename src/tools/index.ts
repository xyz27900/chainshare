import fs from 'fs';
import path from 'path';
import { makeColors } from '@/tools/colors';
import { makeFonts } from '@/tools/fonts';

const stylesDir = path.resolve(process.cwd(), 'src', 'styles');
const colorsFile = path.resolve(stylesDir, 'colors.css');
const fontsFile = path.resolve(stylesDir, 'fonts.css');

const colors = makeColors();
const fonts = makeFonts();

fs.writeFileSync(colorsFile, colors);
fs.writeFileSync(fontsFile, fonts);
