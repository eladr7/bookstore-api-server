-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `authorID` VARCHAR(191) NOT NULL,
    `publicationDate` DATETIME(3) NOT NULL,
    `genre` ENUM('sciencefiction', 'satire', 'drama', 'action', 'romance', 'mystery', 'horror') NOT NULL,
    `price` DOUBLE NOT NULL,

    INDEX `Book_genre_idx`(`genre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` VARCHAR(191) NOT NULL,
    `authorName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_authorID_fkey` FOREIGN KEY (`authorID`) REFERENCES `Author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
