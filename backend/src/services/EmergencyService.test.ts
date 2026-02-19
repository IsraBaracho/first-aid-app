import { EmergencyService } from "./EmergencyService";
import { EmergencyRepository } from "../repositories/EmergencyRepository";
import { Emergency, EmergencyDTO } from "../models/Emergency";

// Mock do Repository
jest.mock("../repositories/EmergencyRepository");

describe("EmergencyService", () => {
  let service: EmergencyService;
  let mockRepository: jest.Mocked<EmergencyRepository>;

  beforeEach(() => {
    // Limpa mocks antes de cada teste
    jest.clearAllMocks();

    // Cria instância do service
    service = new EmergencyService();

    // Pega referência do mock
    mockRepository = (service as any).repository;
  });

  describe("getAllEmergencies", () => {
    test("deve retornar array de emergências", async () => {
      // ARRANGE
      const mockEmergencies: Emergency[] = [
        {
          id: "1",
          slug: "queimadura",
          title: "Queimadura",
          tags: [],
          description: "",
          cta: null,
          steps: [],
        },
      ];
      mockRepository.findAll.mockResolvedValue(mockEmergencies);

      // ACT
      const result = await service.getAllEmergencies();

      // ASSERT
      expect(result).toEqual(mockEmergencies);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getEmergencyById", () => {
    test("deve retornar emergência se encontrar", async () => {
      // ARRANGE
      const mockEmergency: Emergency = {
        id: "1",
        slug: "queimadura",
        title: "Queimadura",
        tags: [],
        description: "",
        cta: null,
        steps: [],
      };
      mockRepository.findById.mockResolvedValue(mockEmergency);

      // ACT
      const result = await service.getEmergencyById("1");

      // ASSERT
      expect(result).toEqual(mockEmergency);
      expect(mockRepository.findById).toHaveBeenCalledWith("1");
    });

    test("deve retornar null se não encontrar", async () => {
      // ARRANGE
      mockRepository.findById.mockResolvedValue(null);

      // ACT
      const result = await service.getEmergencyById("999");

      // ASSERT
      expect(result).toBeNull();
    });
  });

  describe("createEmergency", () => {
    test("deve criar emergência com dados válidos", async () => {
      // ARRANGE
      const createDto: EmergencyDTO = {
        title: "Queimadura",
        steps: [{ title: "Passo 1", description: "Desc 1" }],
      };

      const mockCreated: Emergency = {
        id: "queimadura-123",
        slug: "queimadura",
        title: "Queimadura",
        tags: [],
        description: "",
        cta: null,
        steps: [{ title: "Passo 1", description: "Desc 1" }],
      };

      mockRepository.create.mockResolvedValue(mockCreated);

      // ACT
      const result = await service.createEmergency(createDto);

      // ASSERT
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("slug");
      expect(result.title).toBe("Queimadura");
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    test("deve lançar erro se title estiver vazio", async () => {
      // ARRANGE
      const invalidDto: EmergencyDTO = {
        title: "",
        steps: [{ title: "Passo 1", description: "Desc 1" }],
      };

      // ACT & ASSERT
      await expect(service.createEmergency(invalidDto)).rejects.toThrow();
    });

    test("deve lançar erro se steps estiver vazio", async () => {
      // ARRANGE
      const invalidDto: EmergencyDTO = {
        title: "Queimadura",
        steps: [],
      };

      // ACT & ASSERT
      await expect(service.createEmergency(invalidDto)).rejects.toThrow();
    });
  });

  describe("updateEmergency", () => {
    test("deve atualizar emergência existente", async () => {
      // ARRANGE
      const mockExisting: Emergency = {
        id: "1",
        slug: "queimadura",
        title: "Queimadura",
        tags: [],
        description: "",
        cta: null,
        steps: [],
      };

      const mockUpdated: Emergency = {
        id: "1",
        slug: "queimadura-grave",
        title: "Queimadura Grave",
        tags: [],
        description: "",
        cta: null,
        steps: [],
      };

      // Mock findById para retornar emergência existente
      mockRepository.findById.mockResolvedValue(mockExisting);
      // Mock update para retornar emergência atualizada
      mockRepository.update.mockResolvedValue(mockUpdated);

      // ACT
      const result = await service.updateEmergency("1", {
        title: "Queimadura Grave",
      });

      // ASSERT
      expect(result?.title).toBe("Queimadura Grave");
      expect(result?.slug).toBe("queimadura-grave");
      expect(mockRepository.findById).toHaveBeenCalledWith("1");
    });

    test("deve retornar null se emergência não existir", async () => {
      // ARRANGE
      mockRepository.findById.mockResolvedValue(null); // ← Adiciona isso!

      // ACT
      const result = await service.updateEmergency("999", { title: "Teste" });

      // ASSERT
      expect(result).toBeNull();
    });
  });

  describe("deleteEmergency", () => {
    test("deve deletar emergência existente", async () => {
      // ARRANGE
      const mockDeleted: Emergency = {
        id: "1",
        slug: "queimadura",
        title: "Queimadura",
        tags: [],
        description: "",
        cta: null,
        steps: [],
      };

      mockRepository.delete.mockResolvedValue(mockDeleted);

      // ACT
      const result = await service.deleteEmergency("1");

      // ASSERT
      expect(result).toEqual(mockDeleted);
      expect(mockRepository.delete).toHaveBeenCalledWith("1");
    });

    test("deve retornar null se emergência não existir", async () => {
      // ARRANGE
      mockRepository.delete.mockResolvedValue(null);

      // ACT
      const result = await service.deleteEmergency("999");

      // ASSERT
      expect(result).toBeNull();
    });
  });
});
