import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, PresentationFile } from '@oai/artifact-tool';

const root=path.resolve('AttendX-Presentation');
const deck=await PresentationFile.importPptx(await FileBlob.load(path.join(root,'output','AttendX_Final_Presentation.pptx')));
for(let i=0;i<deck.slides.items.length;i++){
  const png=await deck.export({slide:deck.slides.items[i],format:'png',scale:1});
  await fs.writeFile(path.join(root,'.build',`final-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));
}
console.log(`Imported and rendered ${deck.slides.items.length} finalized slides.`);
