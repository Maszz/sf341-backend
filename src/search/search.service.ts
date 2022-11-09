import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { Observable, firstValueFrom, catchError } from 'rxjs';
import { LocationResponse } from './search.type';
export interface SearchEventContent {
  content: string;
  type: string;
  id: string;
  date: Date;
  location: string;
}
export interface SearchUserContent {
  content: string;
  type: string;
  id: string;
  name: string;
  bio: string;
}
export type SearchContent = {
  content: string;
  type: string;
  id: string;
  date?: string;
  location?: string;
  name?: string;
  bio?: string;
};
export type test =
  | {
      content: string;
      type: string;
      id: string;
      date: Date;
      location: string;
    }
  | {
      content: string;
      type: string;
      id: string;
      name: string;
      bio: string;
    }[];

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async search(keyword: string): Promise<SearchContent[]> {
    const events = await this.prisma.event.findMany({
      where: {
        OR: [
          {
            name: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            creator: {
              username: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      select: {
        name: true,
        startDate: true,
        locationName: true,
        id: true,
      },
    });
    const eventsArr = events.map((event) => {
      return {
        content: event.name,
        type: 'event',
        id: event.id,
        date: event.startDate,
        location: event.locationName,
      };
    });
    const user = await this.prisma.user.findMany({
      where: {
        username: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      select: {
        username: true,
        id: true,
        profile: {
          select: {
            displayName: true,
            bio: true,
          },
        },
      },
    });
    const userArr = user.map((user) => {
      return {
        content: user.username,
        type: 'user',
        id: user.id,
        name: user.profile?.displayName || '',
        bio: user.profile?.bio || '',
      };
    });
    const result = [...eventsArr, ...userArr] as SearchContent[];
    return result;
  }

  async searchLocation(keyword: string): Promise<
    {
      geometry: {
        lat: number;
        lng: number;
      };
      place: string;
    }[]
  > {
    // const response = this.httpService
    //   .get(
    //     `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    //       keyword,
    //     )}&key=b5161aaa30ec46a082c959c1114fa8a1&language=en&pretty=1`,
    //   )
    //   .pipe(
    //     map((axiosResponse: AxiosResponse) => {
    //       return axiosResponse.data as LocationResponse;
    //     }),
    //   );

    const { data } = await firstValueFrom(
      this.httpService
        .get<LocationResponse>(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            keyword,
          )}&key=b5161aaa30ec46a082c959c1114fa8a1&language=en&pretty=1`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.message);
            throw 'An error happened!';
          }),
        ),
    );
    const { results } = data;
    const formattedResult = results.map((item) => {
      return {
        geometry: item.geometry,
        place: item.formatted,
        flag: item.annotations.flag,
      };
    });
    return formattedResult;
  }
}

// export interface LocationResponse {
//   documentation: string;
//   licenses: { name: string; url: string }[];
//   rate: {
//     limit: number;
//     remaining: number;
//     reset: number;
//   };
//   results: {
//     annotations: {
//       DMS: {
//         lat: string;
//         lng: string;
//       };
//       MGRS: string;
//       Maidenhead: string;
//       Mercator: {
//         x: number;
//         y: number;
//       };
//       OSM: {
//         edit_url: string;
//         note_url: string;
//         url: string;
//       };
//       UN_M49: any;
//       callingcode: number;
//       currency: {
//         alternate_symbols: any[];
//         decimal_mark: string;
//         html_entity: string;
//         iso_code: string;
//         iso_numeric: string;
//         name: string;
//         smallest_denomination: number;
//         subunit: string;
//         subunit_to_unit: number;
//         symbol: string;
//         symbol_first: number;
//         thousands_separator: number;
//       };
//       flag: string;
//       geohash: string;
//       qibla: number;
//       roadinfo: {
//         drive_on: string;
//         road: string;
//         speed_in: string;
//       };
//       sun: {
//         rise: {
//           apparent: number;
//           astronomical: number;
//           civil: number;
//           nautical: number;
//         };
//         set: {
//           apparent: number;
//           astronomical: number;
//           civil: number;
//           nautical: number;
//         };
//       };
//       timezone: {
//         name: string;
//         now_in_dst: number;
//         offset_sec: number;
//         offset_string: string;
//         short_name: string;
//       };
//       what3words: {
//         words: string;
//       };
//       wikidata: string;
//     };
//     bounds: {
//       northeast: {
//         lat: number;
//         lng: number;
//       };
//       southwest: {
//         lat: number;
//         lng: number;
//       };
//     };
//     components: {
//       'ISO_3166-1_alpha-2': string;
//       'ISO_3166-1_alpha-3': string;
//       'ISO_3166-2': string[];
//       _category: string;
//       _type: string;
//       city: string;
//       continent: string;
//       country: string;
//       country_code: string;
//       neighbourhood: string;
//       postcode: string;
//       quarter: string;
//       road: string;
//       shop: string;
//       state: string;
//       suburb: string;
//     };
//     confidence: 9;
//     formatted: string;
//     geometry: {
//       lat: number;
//       lng: number;
//     };
//   }[];
// }
