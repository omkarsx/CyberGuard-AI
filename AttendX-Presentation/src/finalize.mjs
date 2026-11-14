import path from 'node:path';
import { pathToFileURL } from 'node:url';

const workspaceDir = path.resolve('AttendX-Presentation');
const skillDir = 'C:/Users/om212/.codex/plugins/cache/openai-primary-runtime/presentations/26.1112.11217/skills/Presentations';
const runtime = 'C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt/dependencies';
process.env.RUNTIME_NODE_MODULES = path.join(runtime,'node/node_modules');
const { finalizePresentation } = await import(pathToFileURL(path.join(skillDir,'container_tools/artifact_tool_utils.mjs')).href);
const finalPath = path.join(workspaceDir,'output','AttendX_Final_Presentation.pptx');
const receiptPath = path.join(workspaceDir,'.build','validation.json');
const result = await finalizePresentation({
  workspaceDir,
  candidatePath: path.join(workspaceDir,'.build','AttendX-draft.pptx'),
  finalPath,
  pythonExecutable: path.join(runtime,'python/python.exe'),
  integrityValidatorPath: path.join(skillDir,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath: path.join(skillDir,'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs: ['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
  explicitTotalSlideCount: 11,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  fontPolicy: { basis:'design', families:['Arial'] },
  verifyArtifactToolImport: true,
  receiptPath,
});
console.log(JSON.stringify({finalPath:result.finalPath,sha256:result.finalSha256,bytes:result.byteCount,receiptPath:result.receiptPath},null,2));
