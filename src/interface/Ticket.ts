import { util } from '@/services/util';

export class Ticket {

  list: object[] = [];
  ticket: object;
  motifs: object[] = [];

  get getList() {
    return this.list;
  }

  get getTicket() {
    return this.ticket;
  }

  get getMotifs() {
    return this.motifs;
  }

  async setList(authorization: string): Promise<void> {
    if (!authorization) {
      this.list = [];
    }
    const requestOptions = util.requestOptions('GET', {}, authorization);
    const response = await fetch(`/api/ticket/getAll`, requestOptions);
    this.list = await util.handleResponse(response);
  }

  async setTicket(authorization: string, codeTicket: number): Promise<void> {
    const requestOptions = util.requestOptions('GET', {}, authorization);
    let response = await fetch(`/api/ticket/get?id=${codeTicket}`, requestOptions);
    response = await util.handleResponse(response);
    this.ticket = response[0];
  }

  async setMotifs(authorization: string): Promise<void> {
    if (!authorization) {
      this.motifs = [];
    }
    const requestOptions = util.requestOptions('GET', {}, authorization);
    const response = await fetch(`/api/motif/getAll`, requestOptions);
    this.motifs = await util.handleResponse(response);
  }
}
