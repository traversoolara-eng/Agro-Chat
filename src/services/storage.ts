import { Preferences } from '@capacitor/preferences';

export class StorageManager {
  async set(key: string, value: any): Promise<void> {
    try {
      await Preferences.set({
        key,
        value: JSON.stringify(value),
      });
    } catch (error) {
      console.error(`Error al guardar ${key}:`, error);
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const { value } = await Preferences.get({ key });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error al obtener ${key}:`, error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.error(`Error al eliminar ${key}:`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      await Preferences.clear();
    } catch (error) {
      console.error('Error al limpiar almacenamiento:', error);
    }
  }
}
