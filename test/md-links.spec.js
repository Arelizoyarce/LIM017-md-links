import { determinateAbsolutePath, createAbsolutePath,validatePath} from '../api.js'

const route = './archivosdeprueba';
const absoluteRoute= 'C:\\LABORATORIA PROYECTOS\\P4-MDLINKS\\LIM017-md-links\\archivosdeprueba';
describe('validatePath', () => {
  it('should be return true if the path exists', () => {
    expect(validatePath(route)).toBe(true);
  });
});

describe('determinateAbsolutePath', () => {
  it('should be return false for absolute path', () => {
    expect(determinateAbsolutePath(route)).toBe(false);
  });
});

describe('createAbsolutePath', () => {
  it('should be return a absolute path', () => {
    expect(createAbsolutePath(route)).toBe(absoluteRoute);
  });
});
