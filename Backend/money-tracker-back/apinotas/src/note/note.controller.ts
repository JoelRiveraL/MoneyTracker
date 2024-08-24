import { Body, Controller, Get, Post, UseGuards,Request, Param, Put, Delete} from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteGuard } from './guard/note.guard';

@Controller('note')
export class NoteController {

    constructor(private readonly noteService: NoteService) {}

    @Post('createData')
    @UseGuards(NoteGuard)
    async createData(@Body() data: any,@Request() request:any): Promise<void> {
        const userId= request.user.sub;  
        await this.noteService.createNote({...data,userId});
    }

    @Get('getData')
    @UseGuards(NoteGuard)
    async getData(@Request() request:any): Promise<any> {
        const userId= request.user.sub;  
        return await this.noteService.getNotes(userId);
    }

    @Get('getDataById/:id')
    @UseGuards(NoteGuard)
    async getDataById(@Param('id') id: string, @Request() request: any): Promise<any> {
        const userId = request.user.sub;
        return await this.noteService.getNoteById(userId, id);
    }

    @Put('updateData/:id')
    @UseGuards(NoteGuard)
    async updateData(@Body() data: any,@Request() request:any,@Param('id') id: string): Promise<void> {
        const userId= request.user.sub;  
        await this.noteService.updateNote({...data,userId},id);
    }

    @Delete('deleteData/:id')
    @UseGuards(NoteGuard)
    async deleteData(@Body() data: any,@Request() request:any,@Param('id') id: string): Promise<void> {
        const userId= request.user.sub;  
        await this.noteService.deleteNote({...data,userId},id);
    }
    
}
