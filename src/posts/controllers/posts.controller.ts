import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/auth/guards';
import { RequestWitUser } from 'src/auth/infra/interfaces';
import { CreatePostDto, UpdatePostDto } from '../infra/dto';
import { PostsService } from '../services';

@SerializeOptions({ strategy: 'excludeAll' })
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWitUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
