import * as path from 'path';
import { PackageJson } from 'type-fest';

import { writeFile } from 'fs/promises';

import cwd from './utils/cwd';

const LIBRARY_NAME = '@xeno-planner/backend-types';
const PATH_TO_OUTPUT = 'packages/types';

/** Body of script */
(async () => {
  /** Source directory for library. */
  const libSrcDir = path.join(cwd(), PATH_TO_OUTPUT);

  /** Package.json from root folder. */
  const rootPackageJson: PackageJson = require(
    path.join(cwd(), 'package.json'),
  );

  /** Package.json from library folder. */
  const packageJson: PackageJson = require(
    path.join(libSrcDir, 'package.json'),
  );

  // Update info of library package
  packageJson.name = LIBRARY_NAME;
  packageJson.version = rootPackageJson.version;
  packageJson.author = rootPackageJson.author;
  packageJson.private = false;

  // Update file
  await writeFile(
    path.join(libSrcDir, 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );
})();
