import { Injectable } from '@angular/core';
import { Line } from '../model/line';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LineService {

  private lineUrl = "http://localhost:8080/api/linija";
  private linesSource = new BehaviorSubject<Line[]>([]);
  linesObservable = this.linesSource.asObservable();
  private lines = [];

  constructor(private http: HttpClient) { }

  findAll() {
    this.http.get<Line[]>(this.lineUrl)
      .subscribe(
        lines => {
          this.lines = lines;
          this.linesSource.next(this.lines);
        }
      );
  }

  addLine(line: Line) {
    this.http.post<Line>(this.lineUrl, line)
      .subscribe(
        addedLine => {
          this.lines.push(addedLine);
          this.linesSource.next(this.lines);
          alert("Dodata linija " + line.broj + " - " + line.naziv + ".");
        }
      )
  }

  getLine(id) {
    return this.http.get<Line>(this.lineUrl + "/" + id)
      .pipe(tap(
        line => {
          for (var i = 0; i < this.lines.length; i++) {
            if (line.id === this.lines[i].id) {
              this.lines[i] = line;
              this.linesSource.next(this.lines);
              return line;
            }
          }
        })
      )
  }

  deleteLine(id) {
    this.http.delete<Line>(this.lineUrl + "/" + id)
      .subscribe(
        response => {
          for (var i = 0; i < this.lines.length; i++) {
            if (id === this.lines[i].id) {
              this.lines.splice(i, 1);
              this.linesSource.next(this.lines);
              return;
            }
          }
        },
        error => { alert(error.message) }
      )
  }

  editLine(line: Line) {
    this.http.put<Line>(this.lineUrl, line)
      .subscribe(
        editedLine => {
          for (var i = 0; i < this.lines.length; i++) {
            if (editedLine.id === this.lines[i].id) {
              this.lines[i] = editedLine;
              this.linesSource.next(this.lines);
              return;
            }
          }
        });
  }
}
