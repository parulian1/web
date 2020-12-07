import {asyncScheduler, scheduled} from "rxjs";

export class AuthUserServiceStub {
  getSocialLink() {
    const RESPONSE = [
      {
        provider: 'provider1',
        name: 'nameprovider1',
        is_connect: false,
        can_unlink: false,
      }
    ];
    return scheduled(RESPONSE, asyncScheduler)
  }

}
