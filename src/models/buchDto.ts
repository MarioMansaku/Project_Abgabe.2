import {
    IsISBN,
    IsInt,
    Min,
    Max,
    Matches,
    IsOptional,
    IsPositive,
    IsBoolean,
    IsISO8601,
    IsUrl,
    ArrayUnique,
  } from 'class-validator';
  
  export class BuchDto {
    @IsISBN(13)
    isbn!: string;
  
    @IsInt()
    @Min(0)
    @Max(5)
    rating!: number;
  
    @Matches(/^(EPUB|HARDCOVER|PAPERBACK)$/u)
    @IsOptional()
    art?: string;
  
    @IsPositive()
    preis!: number;
  
    @Min(0)
    @Max(1)
    @IsOptional()
    rabatt?: number;
  
    @IsBoolean()
    @IsOptional()
    lieferbar?: boolean;
  
    @IsISO8601({ strict: true })
    @IsOptional()
    datum?: string;
  
    @IsUrl()
    @IsOptional()
    homepage?: string;
  
    @IsOptional()
    @ArrayUnique()
    schlagwoerter?: string[];
  }
  