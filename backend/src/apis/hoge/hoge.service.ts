import { Injectable } from '@nestjs/common';

@Injectable()
export class HogeService {
  async get() {
    return 'get api/hoge';
  }
  async post(input) {
    console.log(input);
    return 'post api/hoge';
  }
}
