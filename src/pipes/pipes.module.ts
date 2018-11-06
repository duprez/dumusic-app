import { NgModule } from '@angular/core';
import { TextFilterPipe } from './text-filter/text-filter';
@NgModule({
	declarations: [TextFilterPipe],
	imports: [],
	exports: [TextFilterPipe],
	providers: [TextFilterPipe]
})
export class PipesModule {}
