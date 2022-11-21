import { Injectable, ForbiddenException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  initializeApp,
  FirebaseApp,
  FirebaseAppSettings,
  FirebaseOptions,
} from 'firebase/app';
import { App, AppOptions } from 'firebase-admin/app';
import fs from 'fs';
import {
  getStorage,
  FirebaseStorage,
  ref,
  uploadBytes,
  StorageReference,
  UploadResult,
  getDownloadURL,
} from 'firebase/storage';
import sharp, { Sharp } from 'sharp';
@Injectable()
export class FileHandlerService {
  private firebase: FirebaseApp;
  private storage: FirebaseStorage;
  constructor(private prisma: PrismaService) {}

  getStorageRef(path: string) {
    return ref(this.storage, path);
  }

  async uploadFile(ref: StorageReference, file: any): Promise<UploadResult> {
    const metadata = {
      contentType: 'image/jpeg',
    };
    const snapshot = await uploadBytes(ref, file, metadata);

    return snapshot;
  }

  async uploadImage(file: any, userId: string) {
    const buff = await sharp().resize({ width: 200 }).toBuffer();
    const res = await this.prisma.user.update({
      where: {
        username: userId,
      },
      data: {
        profile: {
          update: {
            avarar: '/upload/' + file.filename,
          },
        },
      },
    });
  }
}
