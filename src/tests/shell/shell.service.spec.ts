import { TestBed} from '@angular/core/testing';

import { ShellComponent } from '@app/shell/shell.component';
import { Shell } from '@app/shell/shell.service';

describe('Shell', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShellComponent
      ]
    });
  });

  describe('childRoutes', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Shell.childRoutes(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShellComponent);
    });
  });
});
