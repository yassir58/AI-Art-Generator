import { z } from "zod";
import { db } from "~/server/db";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  
    getImages: publicProcedure.query (async ({ ctx }) => {
        return await db.image.findMany ();
    }
    ),
    createImage: publicProcedure.input (z.object ({
        name: z.string (),
        url: z.string (),
        prompt:z.string (),
        negative:z.string (),
        creatoreId:z.string (),
        creatoreName:z.string (),
        guidence:z.number (),
        width:z.number (),
        height:z.number ()
        })).mutation (async ({ ctx, input }) => {
        
            await db.image.create ({
                data: {
                    name: input.name,
                    url: input.url,
                    prompt:input.prompt,
                    negative:input.negative,
                    createdById:input.creatoreId,
                    creatorName:input.creatoreName,
                    width:input.width,
                    height:input.height,
                    guidence:input.guidence
                }
            });
        }),
    addToCollection: publicProcedure.input (z.object ({
        imageId: z.string (),
        userId: z.string ()
    })).mutation (async ({ ctx, input }) => {
        await db.collection.create ({
            data: {
                imageId: input.imageId,
                userId: input.userId
            }
        });
    }),
    getCollection: publicProcedure.input (z.object ({
        userId: z.string ()
    })).query (async ({ ctx, input }) => {
        const collection = await db.collection.findMany ({
            where: {
                userId: input.userId
            }
        })
        const images = await db.image.findMany ({
            where: {
                id: {
                    in: collection.map (c => c.imageId)
                }
            }
        })
        return images;
    }),
    getHistory: publicProcedure.input (z.object ({
        userId: z.string ()
    })).query (async ({ ctx, input }) => {
        
        const images = await db.image.findMany ({
            where: {
                createdById: input.userId
            }
        })
        return images;
    }),
});
