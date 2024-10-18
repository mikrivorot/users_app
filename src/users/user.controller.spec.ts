import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user", async () => {
    const userDto = {
      pseudonyme: "user1",
      password: "password",
      name: "User One",
    };
    await controller.createUser(userDto);
    expect(service.create).toHaveBeenCalledWith(userDto);
  });

  it("should get all users", async () => {
    await controller.getAllUsers();
    expect(service.findAll).toHaveBeenCalled();
  });

  it("should update a user", async () => {
    const userDto = { name: "Updated Name" };
    await controller.updateUser("userId", userDto);
    expect(service.update).toHaveBeenCalledWith("userId", userDto);
  });

  it("should delete a user", async () => {
    await controller.deleteUser("userId");
    expect(service.delete).toHaveBeenCalledWith("userId");
  });
});
