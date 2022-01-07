import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/users/infra/interfaces';
import { Repository } from 'typeorm';
import { PostNotFoundException } from '../exceptions';
import { CreatePostDto, UpdatePostDto } from '../infra/dto';
import { Post } from '../infra/entities';
import { IPost } from '../infra/interfaces';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find({ relations: ['author'] });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id, {
      relations: ['author'],
    });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }

  async createPost(post: CreatePostDto, user: IUser): Promise<IPost> {
    const newPost = this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto): Promise<IPost> {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne(id, {
      relations: ['author'],
    });
    if (!updatedPost) {
      throw new PostNotFoundException(id);
    }
    return updatedPost;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
